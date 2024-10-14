import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useReducer } from "react"

enum ActionEnums {
   error = "set-error",
   loading = "set-loading",
   success = "set-success",
}

interface Action {
   type: ActionEnums
   //    payload?: boolean
}

interface State {
   isError: boolean
   isLoading: boolean
   isSuccess: boolean
}

const initialState: State = {
   isError: false,
   isLoading: true,
   isSuccess: false,
}

function reducer(state: State, action: Action) {
   switch (action.type) {
      case ActionEnums.success:
         return {
            ...initialState,
            isSuccess: true,
            isLoading: false,
         }

      case ActionEnums.error:
         return {
            ...initialState,
            isError: true,
            isLoading: false,
         }

      case ActionEnums.loading:
         return {
            ...initialState,
            isLoading: true,
         }

      default:
         return state
   }
}

export const ReactImage = (props: { src?: string; className: string }) => {
   const [state, dispatch] = useReducer(reducer, initialState)

   useEffect(() => {
      let img: HTMLImageElement | null

      img = new Image()
      img.onload = () => {
         dispatch({ type: ActionEnums.success })
      }
      img.onerror = () => {
         dispatch({ type: ActionEnums.error })
      }
      img.src = props.src ?? ""

      return () => {
         img = null
      }
   }, [props.src])

   if (state.isLoading) return <Skeleton className={props.className} />

   if (state.isError || props.src === undefined) return <img className="size-10" src="images/avatar.png" />

   return <img className={props.className} src={props.src} />
}
