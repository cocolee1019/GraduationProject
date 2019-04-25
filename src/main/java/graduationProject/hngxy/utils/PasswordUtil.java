package graduationProject.hngxy.utils;

import java.util.Random;

import org.apache.shiro.crypto.hash.DefaultHashService;
import org.apache.shiro.crypto.hash.HashRequest;
import org.apache.shiro.util.ByteSource;

public class PasswordUtil {

	public static String getEncryptionPasswd(String passwd,String salt) {
		DefaultHashService hashService = new DefaultHashService();
		hashService.setHashAlgorithmName("SHA-512");
		hashService.setHashIterations(5);
		HashRequest request = new HashRequest.Builder()
	            .setAlgorithmName("MD5").setSource(ByteSource.Util.bytes(passwd))
	            .setSalt(salt).setIterations(5).build();
		String hex = hashService.computeHash(request).toHex();
		return hex;
	}
	
	public static String randomPassword() {
		StringBuilder passwd = new StringBuilder();
		Random random = new Random();
		for(int i=0; i<6; i++) {
			int x = random.nextInt(3);
			char ch;
			switch(x) {
			case 0:
				ch = (char) (random.nextInt(58)%(57-48+1) + 48);
				passwd.append(ch);
				break;
			case 1:
				ch = (char) (random.nextInt(91)%(90-65+1) + 65);
				passwd.append(ch);
				break;
			case 2:
				ch = (char) (random.nextInt(123)%(122-97+1) + 97);
				passwd.append(ch);
				break;
			}
		}
		return passwd.toString();
	}
	
	public static String randomSalt() {
		StringBuilder salt = new StringBuilder();
		Random random = new Random();
		for(int i=0; i<3; i++) {
			int x = random.nextInt(3);
			char ch;
			switch(x) {
			case 0:
				ch = (char) (random.nextInt(58)%(57-48+1) + 48);
				salt.append(ch);
				break;
			case 1:
				ch = (char) (random.nextInt(91)%(90-65+1) + 65);
				salt.append(ch);
				break;
			case 2:
				ch = (char) (random.nextInt(123)%(122-97+1) + 97);
				salt.append(ch);
				break;
			}
		}
		return salt.toString();
	}
	
	public static void main(String[] args) {
		System.out.println(getEncryptionPasswd("123456", null));
	}
}
