export type Type = any;
export type Key = any;
export type Ref = any;
export type Props = any;
export type ElementType = any;

export interface ReactElementType {
	$$typeof: symbol | number;
	type: ElementType;
	key: Key;
	ref: Ref;
	props: Props;
	__mark: string;
}
/**
 * this.setState({name:'lcz'})
 * this.setState(()=>({name:'lxl'}))
 */
export type Action<State> = State | ((prevState: State) => State);
