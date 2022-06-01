// import Confirm from "@/components/dialog/confirm.vue";
// import Assist from "@/components/dialog/assist.vue";
// import Vue, {VueConstructor} from "vue";
// import {DialogConfirmOptions} from "mand-mobile/types/dialog";


// let _vue: VueConstructor;

// export default (vue: VueConstructor) => {
//   if (_vue) {
//     return
//   }
//   _vue = vue;
//   const ConfirmConstructor = Vue.extend(Confirm)
//   const AssistConstructor = Vue.extend(Assist)

//   vue.prototype.$dialog.confirm = (options: DialogConfirmOptions) => {
//     const vm = new ConfirmConstructor({}).$mount();
//     (vm as any).btns = [
//       {
//         text: options.cancelText || "取消",
//         handler: () => {
//           if (typeof options.onCancel !== "function" || (options.onCancel() as boolean | void) !== false) {
//             (vm as any).close()
//           }
//         },
//       },
//       {
//         text: options.confirmText || '确定',
//         handler: () => {
//           if (typeof options.onConfirm !== "function" || (options.onConfirm() as boolean | void) !== false) {
//             (vm as any).close()
//           }
//         },
//       }
//     ];
//     (vm as any).show(options)
//   }

//   vue.prototype.$alert = (options: DialogConfirmOptions) => {
//     const vm = new ConfirmConstructor({}).$mount();
//     (vm as any).btns = [
//       {
//         text: options.confirmText || '知道了',
//         handler: () => {
//           if (typeof options.onConfirm !== "function" || (options.onConfirm() as boolean | void) !== false) {
//             (vm as any).close()
//           }
//         },
//       }
//     ];
//     (vm as any).show(options)
//   }

//   vue.prototype.$dialog.assist = (options: DialogConfirmOptions) => {
//     const vm = new AssistConstructor({}).$mount();
//     (vm as any).show(options)
//   }
// }
