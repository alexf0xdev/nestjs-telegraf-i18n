# nestjs-telegraf-i18n

Seamless mix of [nestjs-telegraf](https://www.npmjs.com/package/nestjs-telegraf) and [nestjs-i18n](https://www.npmjs.com/package/nestjs-i18n)

```shell
npm install nestjs-telegraf-i18n
```

## Prerequisites
- installed nestjs-telegraf, telegraf, nestjs-i18n
```shell
npm install nestjs-telegraf telegraf nestjs-i18n
```

## Initialization

### Provide the Module with the i18n extended context and add the new middleware that injects the i18n context into the Telegraf context
Sync
```typescript
@Module({
    imports: [
        TelegrafModule.forRoot({
            token: "<your_bot_token>",
            options: {
                contextType: TelegrafI18nContext,
            },
        }),
    ],
    providers: [ TelegrafI18nMiddleware ],
})
export class TelegramModule {}
```

Or Async
```typescript
@Module({
    imports: [
        TelegrafModule.forRootAsync({
            useFactory: () => ({
                token: "<your_bot_token>",
                options: {
                    contextType: TelegrafI18nContext,
                },
            }),
        }),
    ],
    providers: [ TelegrafI18nMiddleware ],
})
export class TelegramModule {}
```

## Usage

The middleware will inject the i18n object into the Telegraf context. 
In your function make the ctx aware that it has the object by providing the type `TelegrafI18nContext`
If you have multiple telegraf context types chain them with `&`

```typescript
import { Scenes } from 'telegraf';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { TelegrafI18nContext } from "nestjs-telegraf-i18n";

@Update()
export class BotUpdate {
    @Start()
    async start_command(@Ctx() ctx: Scenes.WizardContext & TelegrafI18nContext) {
        const internationalized_hello_message = ctx.i18n.t("i18n.menus.hello.message");
        await ctx.reply(internationalized_hello_message);
    }
}

```

## Type Safety

You can use the built in [type safety features from nestjs-i18n](https://nestjs-i18n.com/guides/type-safety)
Follow their instruction to generate the translations type and you can pass it to the extended context.

```typescript
import { Scenes } from 'telegraf';
import { Ctx, Start, Update } from 'nestjs-telegraf';
import { TelegrafI18nContext } from "nestjs-telegraf-i18n";
import { I18nTranslations } from './generated/i18n.generated.ts';

@Update()
export class BotUpdate {
    @Start()
    async start_command(@Ctx() ctx: Scenes.WizardContext & TelegrafI18nContext<I18nTranslations>) {
        const internationalized_hello_message = ctx.i18n.t("i18n.menus.hello.message");
        await ctx.reply(internationalized_hello_message);
    }
}
```