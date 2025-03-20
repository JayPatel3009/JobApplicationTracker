using System.Text.Json.Serialization;

namespace JobApplicationTrackerAPI
{
    public class Enums
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public enum JobApplicationStatusEnum
        {
            Applied,
            Interview,
            Offer,
            Rejected
        }
    }
}
