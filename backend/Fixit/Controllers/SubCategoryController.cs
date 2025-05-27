using Fixit.Interfaces;
using Fixit.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fixit.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SubCategoryController : ControllerBase
    {
        private readonly ISubCategoryRepository _subCategoryRepository;

        public SubCategoryController(ISubCategoryRepository subCategoryRepository)
        {
            _subCategoryRepository = subCategoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var subcategories = await _subCategoryRepository.GetSubCategoriesWithRelationsAsync();
            return Ok(subcategories);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var subcategory = await _subCategoryRepository.GetByIdAsync(id);
            if (subcategory == null) return NotFound();
            return Ok(subcategory);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] SubCategory subcategory)
        {
            var created = await _subCategoryRepository.AddAsync(subcategory);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] SubCategory subcategory)
        {
            if (id != subcategory.Id) return BadRequest();
            var updated = await _subCategoryRepository.UpdateAsync(subcategory);
            if (updated == null) return NotFound();
            return Ok(updated);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _subCategoryRepository.DeleteSubCategorySafeAsync(id);
            if (!result)
                return Conflict("Kan inte ta bort subkategori som är kopplad till användare.");
            return NoContent();
        }
    }
}
