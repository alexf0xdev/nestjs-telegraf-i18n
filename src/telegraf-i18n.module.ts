import { Module, Global } from '@nestjs/common';
import { TelegrafI18nMiddlewareProvider } from './telegraf-i18n.middleware';
import {I18nContextGetterPatcher, TelegrafI18nContextGetterPatcher} from "./I18n-context-getter-patcher";

@Global()
@Module({
    providers: [TelegrafI18nMiddlewareProvider, TelegrafI18nContextGetterPatcher],
    exports: [TelegrafI18nMiddlewareProvider, TelegrafI18nContextGetterPatcher, I18nContextGetterPatcher],
})
export class TelegrafI18nModule {}