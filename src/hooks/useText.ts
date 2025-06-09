import { useTranslation } from 'react-i18next';

export const useText = () => {
  const { t } = useTranslation();

  return {
    hero: {
      title1: t('hero_title_1'),
      title2: t('hero_title_2'),
      subtitle: t('hero_subtitle'),
      buttonPrimary: t('hero_button_primary'),
      buttonSecondary: t('hero_button_secondary'),
      aiPartners: t('hero_ai_partners'),
    },
    services: {
      title: t('services_title'),
      ai: t('service_ai'),
      aiDesc: t('service_ai_desc'),
      data: t('service_data'),
      dataDesc: t('service_data_desc'),
      predictive: t('service_predictive'),
      predictiveDesc: t('service_predictive_desc'),
    },
    cases: {
      title: t('cases_title'),
      case1Title: t('case_1_title'),
      case1Desc: t('case_1_desc'),
      case2Title: t('case_2_title'),
      case2Desc: t('case_2_desc'),
    },
    contact: {
      title: t('contact_title'),
      subtitle: t('contact_subtitle'),
      button: t('contact_button'),
    },
    blog: {
      title: t('blog_title'),
      subtitle: t('blog_subtitle'),
    },
    article: {
      back: t('back_to_articles'),
      notFound: t('article_not_found'),
      error: t('article_error'),
    },
  };
};
