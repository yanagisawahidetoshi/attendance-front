export default function({ route, store, redirect }) {
  if (!store.state.currentUser && route.path != "/login") {
    return redirect("/login")
  }
}
