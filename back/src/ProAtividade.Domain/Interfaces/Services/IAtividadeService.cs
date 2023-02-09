using System.Threading.Tasks;
using ProAtividade.Domain.Entities;

namespace ProAtividade.Domain.Interfaces.Services
{
    public interface IAtividadeService
    {
        Task<Atividade> AdicionarAtividade(Atividade Model);
        Task<Atividade> AtualizarAtividade(Atividade Model);
        Task<bool> DeletarAtividade(int atividade);
        Task<bool> ConcluirAtividade(Atividade model);
        Task<Atividade[]> PegarTodasAtividadeAsync();
        Task<Atividade> PegarAtividadePorIdAsync(int atividadeId);

    }
}