import React, { useMemo } from "react";
import { useRouter } from "next/router";
import I18n from "../utils/i18n";

const UseI18N = () => {
  const router = useRouter();
  const { lang } = router.query;
  return useMemo(() => I18n({ force: !!lang, lang: lang }), []);
};

export default UseI18N;
