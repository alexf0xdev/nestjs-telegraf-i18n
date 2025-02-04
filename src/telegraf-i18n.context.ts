import { Context as TelegrafContext } from 'telegraf';
import { I18nContext } from 'nestjs-i18n';

export class TelegrafI18nContext<K = Record<string, unknown>> extends TelegrafContext {
    i18n!: I18nContext<K>;
    // t = (...args: Parameters<I18nContext<K>["t"]>) => this.i18n?.t(...args) ?? '';
    // translate = (...args: Parameters<I18nContext<K>["translate"]>) => this.i18n?.translate(...args) ?? '';
}
