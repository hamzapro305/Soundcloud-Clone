import { ENV } from "@/config"

export default function Home() {

	fetch(ENV.BACKEND_HOST("/api/test"), {
		method: "GET"
	}).then(console.log).catch(console.log)

	return (
		<main className="container">
			Something123
			<div>backend:8000</div>
		</main>
	)
}
