import { type RefObject, useEffect } from "react";

export const useOutsideClick = (
	ref: RefObject<HTMLDivElement>,
	callback: (event: Event) => void
) => {
	useEffect(() => {
		// biome-ignore lint/suspicious/noExplicitAny: required for event type
		const listener = (event: any) => {
			if (!ref.current || ref.current.contains(event.target)) {
				return;
			}
			callback(event);
		};

		document.addEventListener("mousedown", listener);
		document.addEventListener("touchstart", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
			document.removeEventListener("touchstart", listener);
		};
	}, [ref, callback]);
};
