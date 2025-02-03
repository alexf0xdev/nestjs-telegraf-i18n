import { Injectable, Logger } from '@nestjs/common';
import { I18nContext, I18nService} from 'nestjs-i18n';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { TelegrafI18nContext } from "./telegraf-i18n.context";

@Injectable()
export class TelegrafI18nMiddleware<K = Record<string, unknown>> {
    private readonly logger = new Logger(this.constructor.name);

    constructor(
        private readonly i18nService: I18nService<K>,
        @InjectBot() private readonly bot: Telegraf<TelegrafI18nContext<K>>
    ) {
        this.logger.log('Initializing Telegraf Context with i18n');
        this.bot.use(async (ctx: TelegrafI18nContext<K>, next) => {
            ctx.i18n = new I18nContext<K>(ctx?.from?.language_code!, this.i18nService);
            await next();
        });
    }
}