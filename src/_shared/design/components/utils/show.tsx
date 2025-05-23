import { Children, FC, ReactNode } from "react";

interface IShowProps {
  children: ReactNode;
}

interface IWhenProps {
  condition: boolean;
  children: ReactNode;
}

interface IElseProps {
  render?: ReactNode;
  children?: ReactNode;
}

const Show: FC<IShowProps> & { When: FC<IWhenProps>; Else: FC<IElseProps> } = (
  props
) => {
  let when: ReactNode = null;
  let otherwise: ReactNode = null;

  Children.forEach(props.children, (child: any) => {
    if (child && child.props) {
      if (child.props.condition === undefined) {
        otherwise = child;
      } else if (!when && child.props.condition === true) {
        when = child;
      }
    }
  });

  return <>{when || otherwise}</>;
};

Show.When = ({ condition, children }: IWhenProps) =>
  condition ? <>{children}</> : null;
Show.Else = ({ render, children }: IElseProps) =>
  render ? <>{render}</> : <>{children}</>;

export default Show;
