import { Locale } from '@Src/shared/libs/i18n';
import { createContext } from 'react';

type I18nContextType = {
  locale: Locale;
};

const I18nContext = createContext<I18nContextType | null>(null);

export default I18nContext;
