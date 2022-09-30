import { createStore } from "vuex";
import goods from "./goods"
import cart from "./cart"
import mutual from "./mutual"

export default createStore({
  modules: {
    goods,
    cart,
    mutual,
  }
});
