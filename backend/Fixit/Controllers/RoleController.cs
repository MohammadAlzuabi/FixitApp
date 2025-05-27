using Fixit.Interfaces;
using Fixit.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fixit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _roleRepository;

        public RoleController(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var roles = await _roleRepository.GetRoleWithRelationsAsync();
            return Ok(roles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var role = await _roleRepository.GetByIdAsync(id);
            if (role == null) return NotFound();
            return Ok(role);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Role role)
        {
            var created = await _roleRepository.AddAsync(role);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Role role)
        {
            if (id != role.Id) return BadRequest();
            var updated = await _roleRepository.UpdateAsync(role);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _roleRepository.DeleteAsync(id);
            if (!result) return NotFound();
            return NoContent();
        }
    }
}
