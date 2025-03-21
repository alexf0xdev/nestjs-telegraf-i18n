import { Injectable, Logger, OnModuleInit } from "@nestjs/common";

@Injectable()
export class TelegrafI18nLoggerInterceptor implements OnModuleInit {
  private readonly logger = new Logger(this.constructor.name);
  private static readonly suppressed_messages: string =
    "context type: telegraf not supported";

  onModuleInit() {
    this.logger.log(
      `Intercepting I18nService Logger to suppress unwanted warnings: '${TelegrafI18nLoggerInterceptor.suppressed_messages}'`,
    );
    const originalWarn = Logger.prototype.warn;
    Logger.prototype.warn = function (message: any, ...optionalParams: any[]) {
      if (
        typeof message === "string" &&
        message.startsWith(TelegrafI18nLoggerInterceptor.suppressed_messages)
      ) {
        return; // Suppress this specific warning
      }
      originalWarn.call(this, message, ...optionalParams);
    };
  }
}
