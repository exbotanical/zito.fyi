export interface LinkProps {
	className?: string;
	activeClassName?: string;
	children: React.ReactNode;
	to: string;
	href?: string;
	noBasePath?: boolean;
	ariaLabel?: string;
}
