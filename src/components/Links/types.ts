export interface ILinkProps {
	className?: string;
	activeClassName?: string;
	children: React.ReactNode;
	to: string;
	href?: string;
	noBasePath?: boolean;
	ariaLabel?: string;
}
