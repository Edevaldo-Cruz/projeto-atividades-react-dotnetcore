using System.Threading.Tasks;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;
        private readonly IGeralRepo _geralRepo;
        public AtividadeService(IAtividadeRepo atividadeRepo, IGeralRepo geralRepo)
        {
            _geralRepo = geralRepo;
            _atividadeRepo = atividadeRepo;

        }
        public Task<Atividade> AdicionarAtividae(Atividade Model)
        {
            throw new System.NotImplementedException();
        }

        public Task<Atividade> AtualizarAtividae(Atividade Model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> ConcluirAtividade(Atividade model)
        {
            throw new System.NotImplementedException();
        }

        public Task<bool> DeletarAtividade(int atividade)
        {
            throw new System.NotImplementedException();
        }

        public Task<Atividade> PegarAtividadePorIdAsync(int atividadeId)
        {
            throw new System.NotImplementedException();
        }

        public Task<Atividade[]> PegarTodasAtividadeAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}