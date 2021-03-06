using GroSharies.Models.DataModels;
using GroSharies.Models.DomainModels;
using System.Collections.Generic;

namespace GroSharies.Repositories
{
    public interface IHouseholdUserRepository
    {
        List<HouseholdUserRelation> GetAllByUserId(int userId);
        List<HouseholdUser> GetAllByHousehold(int householdId);
        HouseholdUser GetHouseholdUser(int householdId, int userId);
        List<UserDetail> GetUserDetailsByHousehold(int householdId);
        List<string> GetEmailsByHousehold(int householdId);
        void AddAdmin(int householdId, int userId);
        void InviteMember(int householdId, int userId);
        void AcceptInvite(int householdId, int userId);
        void DeclineInviteOrLeave(int householdId, int userId);
        void KickUser(int householdUserId);
        int CountHouseholdUsers(int householdId);
        int CountHouseholdLists(int householdId);
    }
}