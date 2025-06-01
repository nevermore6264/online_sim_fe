import { ref, watch, onMounted } from "vue";
import { useI18n } from "vue-i18n";

export const useLanguage = () => {
  const { locale, setLocale: i18nSetLocale } = useI18n();
  const currentLocale = ref(locale.value);

  // Hàm set locale mới
  const setLocale = async (newLocale) => {
    if (process.client) {
      useCookie("i18n_redirected").value = newLocale;
      await i18nSetLocale(newLocale);
    }
  };

  // Khôi phục locale từ localStorage khi component được mount
  onMounted(() => {
    const savedLocale = localStorage.getItem("user-locale");
    if (savedLocale && savedLocale !== locale.value) {
      setLocale(savedLocale);
    }
  });

  // Theo dõi thay đổi locale
  watch(
    locale,
    (newLocale) => {
      if (process.client) {
        localStorage.setItem("user-locale", newLocale);
        currentLocale.value = newLocale;
      }
    },
    { immediate: true }
  );

  return {
    locale: currentLocale,
    setLocale,
  };
};
