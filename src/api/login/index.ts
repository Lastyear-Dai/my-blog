import type { LoginPage, EnrollPage } from "@/type/login";
import request from "@/utils/request";

type Request = Promise<{ code: number, message: string }>

/**
 * 登录
 */
export const loginApi = (data: LoginPage): Request => request.post("/login", { data });
/**
 * 注册
 */
export const enrollApi = (data: EnrollPage): Request => request.post("/register", { data });
/**
 * 获取验证码
 */
export const sendEmail = (data: { email: string }): Request => request.post("/sendEmail", { data });
