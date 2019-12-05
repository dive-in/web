export default interface ResponseBody<T> {
  status: number;
  payload: T;
}
