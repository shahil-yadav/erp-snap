import type {} from "@mui/material/themeCssVarsAugmentation"
import { ThemeOptions, PaletteMode } from "@mui/material/styles"
import { getDesignTokens } from "./themePrimitives"
import {
   inputsCustomizations,
   dataDisplayCustomizations,
   feedbackCustomizations,
   navigationCustomizations,
   surfacesCustomizations,
} from "./customizations"

export function getTheme(mode: PaletteMode): ThemeOptions {
   return {
      ...getDesignTokens(mode),
      components: {
         ...inputsCustomizations,
         ...dataDisplayCustomizations,
         ...feedbackCustomizations,
         ...navigationCustomizations,
         ...surfacesCustomizations,
      },
   }
}