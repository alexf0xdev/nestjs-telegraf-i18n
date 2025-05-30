import { Logger } from "@nestjs/common";
import { I18nContext, Path, PathValue, TranslateOptions } from "nestjs-i18n";
import { Context as TelegrafContext } from "telegraf";

export class TelegrafContextWithSession extends TelegrafContext {
  session?: { lang?: string; fallbackLang?: string };
}

export class TelegrafI18nContext<
  K = Record<string, unknown>,
> extends TelegrafContextWithSession {
  private readonly logger = new Logger(this.constructor.name);
  protected _i18n?: I18nContext<K>;

  i18n(): I18nContext<K> | undefined {
    const lang = this.getLanguage();

    const { translate, t, validate, i18n, lang: _lang, ...rest } = this._i18n!;

    return { translate, t, i18n, validate, lang, ...rest };
  }

  setI18n(i18n: I18nContext<K>) {
    this._i18n = i18n;
  }

  /**
   * Translates the given key using the current i18n context.
   * Falls back to returning the key as a string if i18n is not initialized.
   *
   * @param key - The translation key path.
   * @param options - Optional translation options.
   * @returns The translated value or the key itself.
   */
  public translate<P extends Path<K>, R = PathValue<K, P>>(
    key: P,
    options?: TranslateOptions
  ): R | string {
    if (!this._i18n) {
      this.logger.warn(
        `i18n was not initialized for this Telegraf context. Cannot translate key='${key}'`
      );
      return key as string; // Fallback: Return the key itself
    }

    const lang = this.getLanguage();

    return this._i18n.translate<P, R>(key, { lang, ...options });
  }

  /**
   * Shorthand for `translate()`. Translates the given key using the current i18n context.
   */
  public t<P extends Path<K>, R = PathValue<K, P>>(
    key: P,
    options?: TranslateOptions
  ): R | string {
    return this.translate<P, R>(key, options);
  }

  /**
   * Translates the given key and sends it as a reply message using `ctx.reply`.
   *
   * @param key - The translation key path.
   * @param options - Optional translation and reply options.
   */
  public async replyWithTranslation<P extends Path<K>, R = PathValue<K, P>>(
    key: P,
    options?: TranslateOptions & {
      replyOptions?: Parameters<TelegrafContext["reply"]>[1];
    }
  ): Promise<void> {
    const lang = this.getLanguage();

    const message = this.t<P, R>(key, { lang, ...options });

    await this.reply(String(message), options?.replyOptions);
  }

  /**
   * Shorthand for `replyWithTranslation()`. Translates the given key and sends it as a reply message using `ctx.reply`.
   */
  public async tReply<P extends Path<K>, R = PathValue<K, P>>(
    key: P,
    options?: TranslateOptions & {
      replyOptions?: Parameters<TelegrafContext["reply"]>[1];
    }
  ): Promise<void> {
    return this.replyWithTranslation<P, R>(key, options);
  }

  /**
   * Get language.
   * @returns Current language.
   */
  public getLanguage(): string {
    return (
      this?.session?.lang! ||
      this?.from?.language_code! ||
      this.session?.fallbackLang!
    );
  }

  /**
   * Set language.
   *
   * @param lang - The language to change to.
   */
  public setLanguage(lang: string): void {
    this.session!.lang = lang;
  }
}
