export interface LinkProps {
	className?: string;
	activeClassName?: string;
	children: React.ReactNode;
	to: string;
	href?: string;
	sansBasePath?: boolean;
	ariaLabel?: string;
}
