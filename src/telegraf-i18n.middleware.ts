import { Injectable, Logger } from '@nestjs/common';
import { I18nContext, I18nService} from 'nestjs-i18n';
import { InjectBot } from 'nestjs-telegraf';
import { Context, Telegraf } from 'telegraf';
import { TelegrafI18nContext } from "./telegraf-i18n.context";

@Injectable()
export class TelegrafI18nMiddleware<K = Record<string, unknown>> {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        private readonly i18nService: I18nService<K>,
        @InjectBot() private readonly bot: Telegraf<Context>
    ) {
        this.logger.log('Initializing Telegraf Context with i18n');
        this.bot.use(async (ctx, next) => {
            if (!ctx.from) {
                return next();
            }
            const language = ctx.from.language_code || (this.i18nService as any).getFallbackLanguage();
            Object.setPrototypeOf(ctx, TelegrafI18nContext.prototype);
            (ctx as TelegrafI18nContext<K>).i18n = new I18nContext<K>(language, this.i18nService);

            await next();
        });
    }
}