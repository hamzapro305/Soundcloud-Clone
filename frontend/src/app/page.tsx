export default function Home() {
	console.log(process.env)
	return (
		<main className="container">
			Something123
			<div>{process.env?.BACKEND_DOMAIN}</div>
		</main>
	)
}
