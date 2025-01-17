// sync from import { NODE_TYPE } from '@my-react/react-reconciler';

export enum NODE_TYPE {
  __initial__ = 0,
  __class__ = 1 << 0,
  __function__ = 1 << 1,
  __lazy__ = 1 << 2,
  __memo__ = 1 << 3,
  __forwardRef__ = 1 << 4,
  __provider__ = 1 << 5,
  __consumer__ = 1 << 6,
  __portal__ = 1 << 7,
  __null__ = 1 << 8,
  __text__ = 1 << 9,
  __empty__ = 1 << 10,
  __plain__ = 1 << 11,
  __strict__ = 1 << 12,
  __suspense__ = 1 << 13,
  __fragment__ = 1 << 14,
  __keepLive__ = 1 << 15,
  __scope__ = 1 << 16,
  __comment__ = 1 << 17,
  __profiler__ = 1 << 18,
}
