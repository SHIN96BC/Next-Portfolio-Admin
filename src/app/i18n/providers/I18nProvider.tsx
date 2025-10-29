import I18nContext from '@Src/app/i18n/contexts/I18nContext';
import { Locale } from '@Src/shared/libs/i18n';

export default function I18nProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <I18nContext.Provider value={{ locale }}>{children}</I18nContext.Provider>;
}
