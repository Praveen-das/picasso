import { useStore } from "../Context/Store";

export const useHelper = () => {
  const skeleton = () => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const set = useStore((state) => state.set);

  const getAverageRating = (array) => {
    if (array === null) return;
    let rating =
      (
        array[5] * 5 +
        array[4] * 4 +
        array[3] * 3 +
        array[2] * 2 +
        array[1] * 1
      ) /
      (
        array[5] +
        array[4] +
        array[3] +
        array[2] +
        array[1]
      );
    if (Number.isNaN(rating)) return 0;
    return rating;
  };

  const getDeliveryDate = () => {
    var today = new Date();

    var deliveryDate = today;
    var total_days = 9;
    for (var days = 1; days <= total_days; days++) {
      deliveryDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
      if (deliveryDate.getDay() === 0 || deliveryDate.getDay() === 6) {
        total_days++;
      }
    }
    return (
      deliveryDate.toDateString() + " " + deliveryDate.toLocaleTimeString()
    );
  };

  const copyToClipboard = async (type, value) => {
    await set(({ alert }) => {
      alert.toggled = false;
    });

    await navigator.clipboard.writeText(value);
    await set(({ alert }) => {
      alert.toggled = true;
      alert.message = `${type} copied to clipboard`;
      alert.type = "info";
      alert.time = 1000;
    });
  };

  return {
    getDeliveryDate,
    getAverageRating,
    copyToClipboard,
    skeleton,
  };
};
