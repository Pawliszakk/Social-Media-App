import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
	children: ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
	const [mounted, setMounted] = useState(false);

	const portalRoot =
		typeof document !== 'undefined'
			? document.getElementById('overlay-root')
			: null;

	useEffect(() => {
		setMounted(true);

		return () => setMounted(false);
	}, []);

	return mounted ? createPortal(children, portalRoot!) : null;
};

export default Portal;
