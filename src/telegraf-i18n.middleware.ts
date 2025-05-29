import { Injectable, Logger } from "@nestjs/common";
import { I18nContext, I18nService } from "nestjs-i18n";
import {
  TelegrafContextWithSession,
  TelegrafI18nContext,
} from "./telegraf-i18n.context";

@Injectable()
export class TelegrafI18nMiddlewareProvider<K = Record<string, unknown>> {
  private readonly logger = new Logger(this.constructor.name);
  private static INVALID_CONTEXT_WARNING =
    "The provided context is not an instance of TelegrafI18nContext. " +
    "This may indicate that the middleware is not properly registered or that the context is being overridden elsewhere. " +
    "As a result, i18n functionalities will not be available in the Telegraf context.";

  constructor(private readonly i18nService: I18nService<K>) {
    this.logger.log("Initializing Telegraf Context with i18n");
    this.telegrafI18nMiddleware = this.telegrafI18nMiddleware.bind(this);
  }

  async telegrafI18nMiddleware(
    ctx: TelegrafContextWithSession,
    next: () => Promise<void>
  ) {
    const language: string =
      ctx?.session?.lang ||
      ctx?.from?.language_code ||
      (this.i18nService as any)?.i18nOptions?.fallbackLanguage ||
      "en";

    if (!(ctx instanceof TelegrafI18nContext)) {
      this.logger.warn(TelegrafI18nMiddlewareProvider.INVALID_CONTEXT_WARNING);
      return next();
    }
    ctx.setI18n(new I18nContext<K>(language, this.i18nService));
    await next();
  }
}
