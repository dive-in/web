export default interface ResponseBody<T> {
  status: number;
  message: T;
}
