import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Tag from "primevue/tag";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";

import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import Checkbox from "primevue/checkbox";
import Toast from "primevue/toast";
import Breadcrumb from "primevue/breadcrumb";
import Timeline from "primevue/timeline";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordion";
import DataView from "primevue/dataview";
import TabMenu from "primevue/tabmenu";
import Slider from "primevue/slider";
import Paginator from "primevue/paginator";
import Carousel from "primevue/carousel";
import InputSwitch from "primevue/inputswitch";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue);

  nuxtApp.vueApp.component("Tag", Tag);
  nuxtApp.vueApp.component("DataTable", DataTable);
  nuxtApp.vueApp.component("Column", Column);
  nuxtApp.vueApp.component("Button", Button);
  nuxtApp.vueApp.component("InputText", InputText);
  nuxtApp.vueApp.component("InputNumber", InputNumber);
  nuxtApp.vueApp.component("Dialog", Dialog);
  nuxtApp.vueApp.component("Dropdown", Dropdown);
  nuxtApp.vueApp.component("Checkbox", Checkbox);
  nuxtApp.vueApp.component("Toast", Toast);
  nuxtApp.vueApp.component("Breadcrumb", Breadcrumb);
  nuxtApp.vueApp.component("Timeline", Timeline);
  nuxtApp.vueApp.component("Accordion", Accordion);
  nuxtApp.vueApp.component("AccordionTab", AccordionTab);
  nuxtApp.vueApp.component("DataView", DataView);
  nuxtApp.vueApp.component("TabMenu", TabMenu);
  nuxtApp.vueApp.component("Slider", Slider);
  nuxtApp.vueApp.component("Paginator", Paginator);
  nuxtApp.vueApp.component("Carousel", Carousel);
  nuxtApp.vueApp.component("InputSwitch", InputSwitch);
});
