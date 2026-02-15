export default function RentalCard({ rental }) {
  return (
    <div style={{border:'1px solid #ccc', padding:12, borderRadius:6}}>
      <h3>{rental.title}</h3>
      <p>{rental.description}</p>
      <p>Price: {rental.price}</p>
      <p>Owner: {rental.owner?.name}</p>
    </div>
  );
}
