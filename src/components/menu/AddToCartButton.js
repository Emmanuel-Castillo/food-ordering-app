export default function AddToCartButton({
  image,
  hasSizesOrExtras,
  onClick,
  basePrice,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-8 py-2"
    >
      {hasSizesOrExtras ? (
        <span>Add to cart (from ${basePrice})</span>
      ) : (
        <span>Add to cart ${basePrice}</span>
      )}
    </button>
  );
}
