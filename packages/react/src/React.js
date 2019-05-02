/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// react的版本号
import ReactVersion from 'shared/ReactVersion';

// 标识react的符号类型
import {
  REACT_CONCURRENT_MODE_TYPE,
  REACT_FRAGMENT_TYPE,
  REACT_PROFILER_TYPE,
  REACT_STRICT_MODE_TYPE,
  REACT_SUSPENSE_TYPE,
} from 'shared/ReactSymbols';

// 是否支持hooks，16.6hooks只是一个简单的api
import {enableHooks} from 'shared/ReactFeatureFlags';

// class component的两种创建方式
import {Component, PureComponent} from './ReactBaseClasses';
// create ref方法
import {createRef} from './ReactCreateRef';

// 操作React.Children的几种方法
import {forEach, map, count, toArray, only} from './ReactChildren';

// reactElement的几种类型
import {
  createElement,
  createFactory,
  cloneElement,
  isValidElement,
} from './ReactElement';

// context api
import {createContext} from './ReactContext';

// 好像是和异步加载有关的？
import {lazy} from './ReactLazy';

// 在组件中创建ref，传递作用
import forwardRef from './forwardRef';

// memo api， 函数版的purecomponent?
import memo from './memo';

// hooks相关的api
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from './ReactHooks';

// 做检查的，判断元素是否合法
import {
  createElementWithValidation,
  createFactoryWithValidation,
  cloneElementWithValidation,
} from './ReactElementValidator';

// 感觉要涉及reconciler,稍后再读？
import ReactSharedInternals from './ReactSharedInternals';

// 是否启用 ConcurrentMode
import {enableStableConcurrentModeAPIs} from 'shared/ReactFeatureFlags';

const React = {
  Children: {
    map,
    forEach,
    count,
    toArray,
    only,
  },

  createRef,
  Component,
  PureComponent,

  createContext,
  forwardRef,
  lazy,
  memo,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,

  createElement: __DEV__ ? createElementWithValidation : createElement,
  cloneElement: __DEV__ ? cloneElementWithValidation : cloneElement,
  createFactory: __DEV__ ? createFactoryWithValidation : createFactory,
  isValidElement: isValidElement,

  version: ReactVersion,

  // 异步渲染的东西，暂时还没正式开始支持
  unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
  unstable_Profiler: REACT_PROFILER_TYPE,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals,
};

// Note: some APIs are added with feature flags.
// Make sure that stable builds for open source
// don't modify the React object to avoid deopts.
// Also let's not expose their names in stable builds.

// 支持currentMode之后导入这些api
if (enableStableConcurrentModeAPIs) {
  React.ConcurrentMode = REACT_CONCURRENT_MODE_TYPE;
  React.Profiler = REACT_PROFILER_TYPE;
  React.unstable_ConcurrentMode = undefined;
  React.unstable_Profiler = undefined;
}

// 是否支持hooks，支持hooks导入这些api
if (enableHooks) {
  React.useCallback = useCallback;
  React.useContext = useContext;
  React.useEffect = useEffect;
  React.useImperativeHandle = useImperativeHandle;
  React.useLayoutEffect = useLayoutEffect;
  React.useMemo = useMemo;
  React.useReducer = useReducer;
  React.useRef = useRef;
  React.useState = useState;
}

export default React;
