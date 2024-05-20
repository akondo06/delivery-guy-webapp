import { useContext } from 'react';
import { LocaleContext, LocaleContextType, setLocale } from 'providers/locale';

export function useLocale(): LocaleContextType {
  const context = useContext(LocaleContext);
  if(context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }

  return {
    locale: context.locale,
    setLocale
  };
}
