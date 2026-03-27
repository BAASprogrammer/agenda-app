import com.fasterxml.jackson.databind.ObjectMapper;
import com.agendaapp.app.dto.UserDTO;
public class TestJackson {
    public static void main(String[] args) throws Exception {
        UserDTO user = new UserDTO("Juan", "Perez", "juan@test.com", true, null);
        ObjectMapper mapper = new ObjectMapper();
        System.out.println(mapper.writeValueAsString(user));
    }
}
