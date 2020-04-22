import Mock from "mockjs";
import { componentStore } from "./data/componentStore.js";
import { previewPage } from "./data/previewPage.js";

// 设置响应延时
Mock.setup({
    timeout: 1000
})
export default [
    Mock.mock('/get/componentStore', "post", componentStore),
    Mock.mock('/get/previewPage', "post", previewPage),
];
