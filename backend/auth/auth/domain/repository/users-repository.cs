public interface UsersRepository {
    Task<bool> Create(Account account);
}