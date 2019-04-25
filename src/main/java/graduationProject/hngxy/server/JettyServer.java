package graduationProject.hngxy.server;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.util.resource.Resource;
import org.eclipse.jetty.xml.XmlConfiguration;

public class JettyServer {
	
	private static Server server;
	
	public static void main(String[] args) throws Exception {
		
		Resource fileserver_xml = Resource.newSystemResource("conf/jetty.xml");
		XmlConfiguration configuration = new XmlConfiguration(fileserver_xml.getInputStream());
		server = (Server) configuration.configure();
		server.start();
	}
	
}
