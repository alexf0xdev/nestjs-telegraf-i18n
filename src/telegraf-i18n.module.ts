import { Module, Global } from "@nestjs/common";
import { TelegrafI18nMiddlewareProvider } from "./telegraf-i18n.middleware";
import { TelegrafI18nContextGetterPatcher } from "./i18n-context-patcher";

@Global()
@Module({
  providers: [TelegrafI18nMiddlewareProvider, TelegrafI18nContextGetterPatcher],
  exports: [TelegrafI18nMiddlewareProvider, TelegrafI18nContextGetterPatcher],
})
export class TelegrafI18nModule {}
