import { Context as TelegrafContext } from "telegraf";
import { I18nContext, Path, PathValue, TranslateOptions } from "nestjs-i18n";
import { Logger } from "@nestjs/common";

export class TelegrafI18nContext<
  K = Record<string, unknown>,
> extends TelegrafContext {
  private readonly logger = new Logger(this.constructor.name);
  protected _i18n?: I18nContext<K>;

  i18n(): I18nContext<K> | undefined {
    return this._i18n;
  }

  setI18n(i18n: I18nContext<K>) {
    this._i18n = i18n;
  }

  public translate<P extends Path<K>, R = PathValue<K, P>>(
    key: P,
    options?: TranslateOptions,
  ): R | string {
    if (!this._i18n) {
      this.logger.warn(
        `i18n was not initialized for this Telegraf context. Cannot translate key='${key}'`,
      );
      return key as string; // Fallback: Return the key itself
    }
    return this._i18n.translate<P, R>(key, options);
  }

  public t<P extends Path<K>, R = PathValue<K, P>>(
    key: P,
    options?: TranslateOptions,
  ): R | string {
    return this.translate<P, R>(key, options);
  }
}
