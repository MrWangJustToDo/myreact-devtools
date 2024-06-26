import { useIsomorphicLayoutEffect } from "framer-motion";
import { useState } from "react";

import { TruncateInstance } from "@/utils/text";

import type { DOMRectType } from "./useSize";

const cache = new Map<string, string>();

export const useTruncateText = ({ text, container, fontSize = "14px" }: { text: string; container: DOMRectType; fontSize?: string }) => {
  const [state, setState] = useState(() => ({ textToDisplay: cache.get(text) || text, maxWidth: Infinity }));

  useIsomorphicLayoutEffect(() => {
    const width = 20;
    let maxWidth = Infinity;
    if (container.width !== 0) {
      const targetWidth = container.right - width;
      if (targetWidth >= container.width) {
        maxWidth = container.width - width;
      } else {
        maxWidth = targetWidth;
      }
    }
    let _text = text;
    if (maxWidth !== Infinity) {
      _text = TruncateInstance.truncate(text, maxWidth, {
        fontSize,
      });
      if (_text.length !== text.length && _text.length <= 3) {
        _text = text[0] + "..." + text[text.length - 1];
      }
      cache.set(text, _text);
      setState({ textToDisplay: _text, maxWidth });
    }
  }, [text, container.width, container.right, fontSize]);

  return state;
};
