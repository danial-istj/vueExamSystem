export function useFormatedDate() {
  function formattedDate(id: number): string {
    const d = new Date(id);

    return d.toLocaleDateString("en-GB", {
      month: "short",
      day: "2-digit",
      
      year: "numeric",
    });
  }

  function formattedTime(id: number): string {
    const d = new Date(id);

    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return{formattedDate,formattedTime}
}
