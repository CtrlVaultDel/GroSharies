using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using GroSharies.Models;
using GroSharies.Repositories;

namespace GroSharies.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class HouseholdController : ControllerBase
    {
        private readonly IHouseholdRepository _householdRepository;
        public HouseholdController(IHouseholdRepository householdRepository)
        {
            _householdRepository = householdRepository;
        }
    }
}
