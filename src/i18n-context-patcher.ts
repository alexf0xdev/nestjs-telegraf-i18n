import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import * as i18nUtils from 'nestjs-i18n/dist/utils/context';

@Injectable()
export class I18nContextGetterPatcher implements OnModuleInit {
    private readonly logger = new Logger(this.constructor.name);
    private readonly _suppressedTypes: Set<string>;

    constructor(private readonly suppressedTypes: Set<string> | string | string[]) {
        if (typeof suppressedTypes === 'string') {
            this._suppressedTypes = new Set([suppressedTypes]);
        } else if (Array.isArray(suppressedTypes)) {
            this._suppressedTypes = new Set(suppressedTypes);
        } else {
            this._suppressedTypes = suppressedTypes;
        }
    }

    onModuleInit() {
        this.logger.log(
            `Patching nestjs-i18n getContextObject to suppress warnings for context types: "${[...this._suppressedTypes].join('", "')}"`
        );
        if (i18nUtils && (i18nUtils as any).getContextObject) {
            const originalGetContextObject = (i18nUtils as any).getContextObject;

            (i18nUtils as any).getContextObject = (...args: any[]) => {
                const contextType = args[1]?.getType?.() ?? 'undefined';
                if (this._suppressedTypes.has(contextType)) {
                    return undefined;
                }
                return originalGetContextObject.apply(this, args);
            };
        }
    }
}

@Injectable()
export class TelegrafI18nContextGetterPatcher extends I18nContextGetterPatcher {
    constructor() {
        super('telegraf');
    }
}