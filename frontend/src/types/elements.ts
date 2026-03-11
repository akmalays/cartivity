import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system/styleFunctionSx';

type SxPropsTheme = SxProps<Theme>;
export type StylesSxProps = {[key: string]: SxPropsTheme};
